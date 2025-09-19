import { notFound } from 'next/navigation';
import ProjectDetail from './ProjectDetail';
import amsContent from '../../data/amsContent';
import amsContentEn from '../../data/amsContentEn';
import PropTypes from 'prop-types';

export async function generateStaticParams() {
  const projects = [...amsContent.works.projects, ...amsContentEn.works.projects];
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }) {
  const { id } = params;
  
  // Find project in both languages
  const projectEs = amsContent.works.projects.find(p => p.id === id);
  const projectEn = amsContentEn.works.projects.find(p => p.id === id);
  
  if (!projectEs && !projectEn) {
    notFound();
  }

  return <ProjectDetail projectId={id} />;
}

ProjectPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
