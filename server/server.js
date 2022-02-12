const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./sequelize');
const app = express();
app.use(express.json());
app.use(cors());

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

const FavouriteList = require('./models/FavouriteList');
const Video = require('./models/video');

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  console.log('Server pornit pe portul ' + port);
});

app.use((err, req, res, next) => {
  console.error('[ERROR]:' + err);
  res.status(500).json({ message: '500 - Server Error' });
});

app.get('/sync', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    const prim = await FavouriteList.create({
      descriere: 'Epic fails',
      data: new Date(),
    });
    const secund = await FavouriteList.create({
      descriere: 'Video-uri gatit',
      data: new Date(),
    });

    const subresursa1 = new Video({ titlu: 'Accident', descriere: "BMW pe autostrada", url: "www.google.ro" });
    subresursa1.FavouriteListId = prim.id;
    await subresursa1.save();

    const subresursa2 = new Video({ titlu: 'Negrese', descriere: "Negresa buna", url: "www.google.ro" });
    subresursa2.FavouriteListId = secund.id;
    await subresursa2.save();

    res.status(201).json({ message: 'sample db created' });
  } catch (err) {
    next(err);
  }
});
app.post("/FavouriteList/filter", async (req, res, next) => {
  try {
    const { descriere, id } = req.body;
    const where = {}
    if(descriere.length > 0) where.descriere = descriere;
    if(id.length > 0) where.id = Number.parseInt(id);
    const parinti = await FavouriteList.findAll(where);
    console.log(where);
    res.status(200).json(parinti);
  } catch (err) {
    next(err);
  }
})
app.get('/FavouriteList/all', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findAll({ include: [Video] });
    res.status(200).json(lista);
  } catch (err) {
    next(err);
  }
});
app.get("/FavouriteList/sort", async (req, res, next) => {
  try {
    const parinti = await FavouriteList.findAll({ include: [Video], order: [["data", "DESC"]] });
    res.status(200).json(parinti);
  } catch (err) {
    next(err);
  }
})
app.get('/FavouriteList/:id', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findByPk(req.params.id);
    if (!lista)
      return res.status(400).json({ eroare: 'Nu exista instanta indicata' });
    res.status(200).json(lista);
  } catch (err) {
    next(err);
  }
});
app.post('/FavouriteList', async (req, res, next) => {
  try {
    const lista = await FavouriteList.create(req.body);
    res.status(201).json(lista);
  } catch (err) {
    next(err);
  }
});
app.put('/FavouriteList/:id', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findByPk(req.params.id);
    if (lista != null) {
      await lista.update(req.body);
      await lista.save();
      res.status(200).json(lista);
    } else res.status(400).json({ error: 'Nu exista instanta indicata' });
  } catch (err) {
    next(err);
  }
});
app.delete('/FavouriteList/:id', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findByPk(req.params.id);
    if (lista != null) {
      await lista.destroy();
      res.status(200).json({ message: 'Succes' });
    } else res.status(400).json({ error: 'Nu exista instanta indicata' });
  } catch (err) {
    next(err);
  }
});

app.get('/FavouriteList/:id/video', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findByPk(req.params.id);
    if (lista == null)
      return res.status(400).json({ eroare: 'Nu exista instanta indicata' });
    const copii = await lista.getVideos();
    res.status(200).json(copii);
  } catch (err) {
    next(err);
  }
});
app.get('/FavouriteList/:id/video/:idVideo', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findByPk(req.params.id, {
      include: [
        {
          model: Video,
          where: {
            id: req.params.idVideo,
          },
        },
      ],
    });
    if (lista) {
      const video = lista.Videos[0];
      res.status(200).json(video);
    } else {
      res.status(400).json({ error: 'Nu exista instanta sau copilul' });
    }
  } catch (err) {
    next(err);
  }
});
app.post('/FavouriteList/:id/video', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findByPk(req.params.id);
    if (lista == null)
      return res.status(400).json({ eroare: 'Nu exista instanta indicata' });
    const video = new Video(req.body);
    video.FavouriteListId = lista.id;
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    next(err);
  }
});
app.put('/FavouriteList/:id/video/:idVideo', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findByPk(req.params.id, {
      include: [
        {
          model: Video,
          where: {
            id: req.params.idVideo,
          },
        },
      ],
    });
    if (lista) {
      const video = lista.Videos[0];
      await video.update(req.body);
      await video.save();
      res.status(202).json(video);
    } else {
      res.status(400).json({ error: 'Nu exista instanta sau copilul' });
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/FavouriteList/:id/video/:idVideo', async (req, res, next) => {
  try {
    const lista = await FavouriteList.findByPk(req.params.id, {
      include: [
        {
          model: Video,
          where: {
            id: req.params.idVideo,
          },
        },
      ],
    });
    if (lista) {
      const video = lista.Videos[0];
      await video.destroy();
      res.status(200).json({ mesaj: 'Stergere realizata cu succes' });
    } else {
      res.status(400).json({ error: 'Nu exista instanta sau copilul' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/export', async (req, res, next) => {
  try {
    const data = await FavouriteList.findAll({ include: [Video] });
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
});

app.post('/import', async (req, res, next) => {
  try {
    for (favList of req.body.data) {
      const list = await FavouriteList.create(favList);
      for (v of favList.Videos) {
        const video = new Video(v);
        video.FavouriteListId = list.id;
        await video.save();
      }
    }
    res.status(200).json({ message: 'Succesfully imported' });
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
