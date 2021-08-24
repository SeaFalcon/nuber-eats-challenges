import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getPodcasts(): Podcast[] {
    return this.podcastsService.getPodcasts();
  }

  @Get('/:id')
  getPodcastById(@Param('id') podcastId: number): Podcast {
    return this.podcastsService.getPodcastById(podcastId);
  }

  @Post()
  create(@Body() podcastData: CreatePodcastDto): Podcast {
    return this.podcastsService.create(podcastData);
  }

  @Patch('/:id')
  update(
    @Param('id') podcastId: number,
    @Body() updateData: UpdatePodcastDto,
  ): Podcast[] {
    return this.podcastsService.update(podcastId, updateData);
  }

  @Delete('/:id')
  deletePodcast(@Param('id') podcastId: number): Podcast[] {
    return this.podcastsService.deletePodcast(podcastId);
  }

  @Get('/:id/episodes')
  getEpisodes(@Param('id') podcastId: number): Episode[] {
    return this.podcastsService.getEpisodes(podcastId);
  }

  @Post('/:id/episodes')
  createEpisode(
    @Param('id') podcastId: number,
    @Body() episodeData: CreateEpisodeDto,
  ): Episode[] {
    return this.podcastsService.createEpisode(podcastId, episodeData);
  }

  @Patch('/:id/episodes/:episodeId')
  updateEpisode(
    @Param('id') podcastId: number,
    @Param('episodeId') episodeId: number,
    @Body() updateData: UpdateEpisodeDto,
  ): Episode {
    return this.podcastsService.updateEpisode(podcastId, episodeId, updateData);
  }

  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: number,
    @Param('episodeId') episodeId: number,
  ): Episode[] {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }
}
