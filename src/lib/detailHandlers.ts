import { getLocaleFromPathname, withTrailingSlash } from '@/lib/urlUtils';

interface CloseArgs {
  closeDetail: () => void;
  setSelectedProject: (p: null) => void;
  closeModal: () => void;
}

export const createCloseProjectDetailHandler = ({
  closeDetail,
  setSelectedProject,
  closeModal,
}: CloseArgs) => {
  return () => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const locale = getLocaleFromPathname(pathname);
    const base = withTrailingSlash(locale ? `/${locale}` : '/');
    window.history.pushState({}, '', `${base}#projects`);
    closeDetail();
    setSelectedProject(null);
    closeModal();
  };
};
