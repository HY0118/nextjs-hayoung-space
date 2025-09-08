import { getLocaleFromPathname, withTrailingSlash } from '@/utils/urlUtils';

interface CloseArgs {
  closeDetail: () => void;
  setSelectedProject: (p: null) => void;
  closeModal: () => void;
  useHistory?: boolean; // whether to push URL state when closing
}

export const createCloseProjectDetailHandler = ({
  closeDetail,
  setSelectedProject,
  closeModal,
  useHistory = true,
}: CloseArgs) => {
  return () => {
    if (useHistory) {
      const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
      const locale = getLocaleFromPathname(pathname);
      const base = withTrailingSlash(locale ? `/${locale}` : '/');
      window.history.pushState({}, '', `${base}#projects`);
    }
    closeDetail();
    setSelectedProject(null);
    closeModal();
  };
};
