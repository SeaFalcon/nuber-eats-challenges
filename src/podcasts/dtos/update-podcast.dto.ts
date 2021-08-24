import { OmitType } from '@nestjs/mapped-types';
import { CreatePodcastDto } from './create-podcast.dto';

export class UpdatePodcastDto extends OmitType(CreatePodcastDto, [
  'episodes',
]) {}
