import { ProjectFormData } from "../components/project-form/project-form.component";

// updates project form data with correctly formatted embed and thumbnail
// links from the generic youtube link
export const updateProjectUrlAndThumbnail = (data: ProjectFormData) => {
  // get project url from form data, return if empty
  const projectUrl = data.project.project_url
  if (!projectUrl) return data;

  // get embed link and thumbnail url from video id
  const videoId = getYoutubeVideoId(projectUrl)
  const embedLink = getEmbedUrl(videoId)
  const thumbnailUrl = getThumbnailUrl(videoId)

  // set project form data with configured links
  data['project']['project_url'] = embedLink
  data['project']['thumbnail_url'] = thumbnailUrl

  return data
}

// get youtube video id from generic youtube link
const getYoutubeVideoId = (youtubeUrl: string) => {
  const urlElements = youtubeUrl.split('=');
  const videoId = urlElements[urlElements.length - 1];
  return videoId
}

// get youtube embed code from video id
const getEmbedUrl = (videoId: string) => {
  const embedUrl = `https://www.youtube.com/embed/${ videoId }`
  return embedUrl
}

// get youtube thumbnail url from video id
const getThumbnailUrl = (videoId: string) => {
  // sets thumbnail to the maxresdefault version, other versions are available
  const thumbnailUrl = `https://img.youtube.com/vi/${ videoId }/maxresdefault.jpg`
  return thumbnailUrl
}