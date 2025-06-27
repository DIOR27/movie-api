const Movie = require('../models/movie');
const redis = require('../services/redis.service');

const TTL = 1800; // 30 minutos en segundos

async function getAll(req, res) {
    const cacheKey = 'movies:all';
    const cached = await redis.get(cacheKey);

    if (cached) {
        return res.json(JSON.parse(cached));
    }

    const movies = await Movie.findAll();
    await redis.set(cacheKey, JSON.stringify(movies), TTL);
    res.json(movies);
}

async function getById(req, res) {
    const { id } = req.params;
    const cacheKey = `movies:${id}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
        return res.json(JSON.parse(cached));
    }

    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: 'Película no encontrada' });

    await redis.set(cacheKey, JSON.stringify(movie), TTL);
    res.json(movie);
}

async function create(req, res) {
    const movie = await Movie.create(req.body);
    await redis.del('movies:all');
    res.status(201).json(movie);
}

async function update(req, res) {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: 'Película no encontrada' });

    await movie.update(req.body);
    await redis.del('movies:all');
    await redis.del(`movies:${id}`);
    res.json(movie);
}

async function remove(req, res) {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: 'Película no encontrada' });

    await movie.destroy();
    await redis.del('movies:all');
    await redis.del(`movies:${id}`);
    res.json({ message: 'Película eliminada exitosamente' });
}

module.exports = { getAll, getById, create, update, remove };
