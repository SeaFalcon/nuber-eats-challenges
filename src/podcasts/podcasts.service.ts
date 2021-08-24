import { Injectable, NotFoundException } from '@nestjs/common';
import { Podcast } from './entities/podcast.entity';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { Episode } from './entities/episode.entity';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getPodcasts(): Podcast[] {
    return this.podcasts;
  }

  getPodcastById(id: number): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with Id ${id} not found.`);
    }

    return podcast;
  }

  create(podcastData: CreatePodcastDto): Podcast {
    const episodes: Episode[] = [];

    podcastData.episodes.forEach((episode) => {
      episodes.push({ id: episodes.length + 1, name: episode });
    });

    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...podcastData,
      episodes,
    });

    return this.podcasts[this.podcasts.length - 1];
  }

  update(id: number, updateData: UpdatePodcastDto): Podcast[] {
    const willUpdateIndex = this.podcasts.findIndex(
      (podcast) => podcast.id === id,
    );

    if (willUpdateIndex < 0) {
      throw new NotFoundException(`Podcast with Id ${id} not found.`);
    }

    this.podcasts[willUpdateIndex].title =
      updateData?.title || this.podcasts[willUpdateIndex].title;

    this.podcasts[willUpdateIndex].category =
      updateData?.category || this.podcasts[willUpdateIndex].category;

    this.podcasts[willUpdateIndex].rating =
      updateData?.rating || this.podcasts[willUpdateIndex].rating;

    return this.podcasts;
  }

  deletePodcast(id: number): Podcast[] {
    this.getPodcastById(id);

    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== id);

    return this.podcasts;
  }

  getEpisodes(id: number): Episode[] {
    const podcast = this.getPodcastById(id);

    return podcast.episodes;
  }

  createEpisode(id: number, episodeData: CreateEpisodeDto): Episode[] {
    const podcast = this.getPodcastById(id);

    episodeData.name.forEach((name) => {
      podcast.episodes.push({ id: podcast.episodes.length + 1, name });
    });

    return podcast.episodes;
  }

  updateEpisode(
    podcastId: number,
    episodeId: number,
    updateData: UpdateEpisodeDto,
  ): Episode {
    const podcast = this.getPodcastById(podcastId);

    const episodeIdx = podcast.episodes.findIndex(
      (episode) => episode.id === episodeId,
    );

    if (episodeIdx < 0) {
      throw new NotFoundException(`Episode with Id ${episodeId} not found.`);
    }

    podcast.episodes[episodeIdx].name = updateData.name;

    return podcast.episodes[episodeIdx];
  }

  deleteEpisode(podcastId: number, episodeId: number): Episode[] {
    const podcast = this.getPodcastById(podcastId);

    podcast.episodes = podcast.episodes.filter(
      (episode) => episode.id !== episodeId,
    );

    return podcast.episodes;
  }
}
