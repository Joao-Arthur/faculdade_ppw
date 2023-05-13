import express, { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import isValid from '../../isValid';
import Album from './album.schema';

const router = express.Router();

type albumFilter = {
    title?: string;
    band?: string;
};

router.get('/', async (req, res) => {
    const title = req.query.title?.toString();
    const band = req.query.band?.toString();

    const filter: albumFilter = {};

    if (title) filter.title = title;
    if (band) filter.band = band;

    const foundAlbums = await Album.find(filter);
    res.send(foundAlbums);
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    if (!_id) return res.sendStatus(StatusCodes.BAD_REQUEST);
    try {
        const foundAlbum = await Album.findById(_id);
        if (foundAlbum) {
            res.send(foundAlbum);
        } else res.sendStatus(StatusCodes.NOT_FOUND);
    } catch {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

type putAlbum = {
    _id?: string;
    title?: string;
    band?: string;
    trackList?: string[];
    release?: Date;
};

router.put('/', async (req: Request<{}, {}, putAlbum>, res) => {
    const album = req.body;
    if (!album.title && !album.band && !album.trackList && !album.release)
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    if (
        !isValid(
            {
                _id: { type: 'string', required: true },
                title: { type: 'string' },
                band: { type: 'string' },
                release: { type: 'date' }
            },
            album
        )
    )
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(album);
        if (updatedAlbum) {
            res.send(updatedAlbum);
        } else res.sendStatus(StatusCodes.NOT_FOUND);
    } catch {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

type postAlbum = {
    title?: string;
    band?: string;
    trackList?: string[];
    release?: Date;
};

router.post('/', async (req: Request<{}, {}, postAlbum>, res) => {
    const album = req.body;
    let trackList = [];
    if (
        !isValid(
            {
                title: { type: 'string', required: true },
                band: { type: 'string', required: true },
                release: { type: 'date', required: true }
            },
            album
        )
    )
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    try {
        const search = new URLSearchParams({
            strict: 'on',
            q: `artist:"${album.band}" album:"${album.title}"`
        }).toString();

        const results = await fetch(`https://api.deezer.com/search?${search}`)
            .then(res => res.json())
            .then(({ data }) => data);

        function addSongs(newSongs) {
            trackList = trackList.concat(
                newSongs.map(({ title_short }) => title_short)
            );
        }

        let fetchedSongs = await fetch(
            `https://api.deezer.com/album/${results[0].album.id}/tracks`
        ).then(res => res.json());

        addSongs(fetchedSongs.data);

        while (fetchedSongs.next) {
            fetchedSongs = await fetch(fetchedSongs.next).then(res =>
                res.json()
            );
            addSongs(fetchedSongs.data);
        }
    } catch (e) {
        console.error(e);
    }
    album.trackList = trackList;
    try {
        const createdAlbum = await Album.create(album);
        return res.send(createdAlbum);
    } catch {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    if (!_id) return res.sendStatus(StatusCodes.BAD_REQUEST);
    try {
        const deletedAlbum = await Album.findByIdAndDelete(_id);
        if (deletedAlbum) {
            res.send(deletedAlbum);
        } else res.sendStatus(StatusCodes.NOT_FOUND);
    } catch {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

export default router;
