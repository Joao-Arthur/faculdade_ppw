import express, { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import isValid from '../../isValid';
import Band from './band.schema';

const router = express.Router();

type bandFilter = {
    name?: string;
    foundation?: number;
    dissolution?: number;
};

router.get('/', async (req, res) => {
    const name = req.query.name?.toString();
    const foundation = Number(req.query.foundation?.toString());
    const dissolution = Number(req.query.dissolution?.toString());

    const filter: bandFilter = {};

    if (name) filter.name = name;
    if (foundation) filter.foundation = foundation;
    if (dissolution) filter.dissolution = dissolution;

    const foundBands = await Band.find(filter);
    res.send(foundBands);
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    if (!_id) return res.sendStatus(StatusCodes.BAD_REQUEST);
    try {
        const foundBand = await Band.findById(_id);
        if (foundBand) {
            res.send(foundBand);
        } else res.sendStatus(StatusCodes.NOT_FOUND);
    } catch {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

type putBand = {
    _id?: string;
    name?: string;
    members?: string[];
    foundation?: number;
    dissolution?: number;
    albums?: string[];
};

router.put('/', async (req: Request<{}, {}, putBand>, res) => {
    const band = req.body;
    if (
        !band.name &&
        !band.members &&
        !band.foundation &&
        !band.dissolution &&
        !band.albums
    )
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    if (
        !isValid(
            {
                _id: { type: 'string', required: true },
                name: { type: 'string' },
                members: { type: 'stringArray' },
                foundation: { type: 'number' },
                dissolution: { type: 'number' }
            },
            band
        )
    )
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    try {
        const updatedband = await Band.findByIdAndUpdate(band);
        if (updatedband) {
            res.send(updatedband);
        } else res.sendStatus(StatusCodes.NOT_FOUND);
    } catch {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

type postBand = {
    name?: string;
    members?: string[];
    foundation?: number;
    dissolution?: number;
    albums?: string[];
};

router.post('/', async (req: Request<{}, {}, postBand>, res) => {
    const band = req.body;
    let albums = [];
    if (
        !isValid(
            {
                name: { type: 'string', required: true },
                members: { type: 'stringArray', required: true },
                foundation: { type: 'number', required: true },
                dissolution: { type: 'number', required: true }
            },
            band
        )
    )
        return res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    try {
        const search = new URLSearchParams({
            strict: 'on',
            q: `artist:"${band.name}"`
        }).toString();

        const results = await fetch(`https://api.deezer.com/search?${search}`)
            .then(res => res.json())
            .then(({ data }) => data);

        function addAlbums(newAlbums) {
            albums = albums.concat(
                newAlbums
                    .filter(({ record_type }) => record_type === 'album')
                    .map(({ title }) => title)
            );
        }

        let fetchedAlbums = await fetch(
            `https://api.deezer.com/artist/${results[0].artist.id}/albums`
        ).then(res => res.json());

        addAlbums(fetchedAlbums.data);

        while (fetchedAlbums.next) {
            fetchedAlbums = await fetch(fetchedAlbums.next).then(res =>
                res.json()
            );
            addAlbums(fetchedAlbums.data);
        }
    } catch (e) {
        console.error(e);
    }
    band.albums = albums;
    try {
        const createdBand = await Band.create(band);
        return res.send(createdBand);
    } catch {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    if (!_id) return res.sendStatus(StatusCodes.BAD_REQUEST);
    try {
        const deletedBand = await Band.findByIdAndDelete(_id);
        if (deletedBand) {
            res.send(deletedBand);
        } else res.sendStatus(StatusCodes.NOT_FOUND);
    } catch {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

export default router;
