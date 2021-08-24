# today's todo list

GET /podcasts
POST /podcasts
GET /podcasts/:id
PATCH /podcasts/:id
DELETE /podcasts/:id
GET /podcasts/:id/episodes
POST /podcasts/:id/episodes
PATCH /podcasts/:id/episodes/:episodeId
DELETE /podcasts/:id/episodes/:episodeId

## podcast.entity 는 다음과 같은 형태여야 합니다.

```js
class Podcast {
  id: number;
  title: string;
  category: string;
  rating: number;
  episodes: Episode[];
}
```

Episode Entity를 만들어야 합니다.
Podcast Service를 만드시고, DB를 구현하세요.
모든 엔드포인트가 정상적으로 작동해야 합니다.
podcasts.service, podcasts.controllers 그리고 episode.entity 파일을 만드셔야 합니다.
