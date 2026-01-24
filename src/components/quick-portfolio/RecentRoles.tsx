export default function RecentRoles() {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        RECENT ROLES
      </h3>
      <ul className="mt-3 space-y-1 text-text-primary text-base font-pret list-disc list-inside">
        <li className="font-pret">
          웹({' '}
          <a
            href="https://tools.midasuser.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Tools
          </a>
          ,{' '}
          <a
            href="https://motiiv.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Motiiv
          </a>{' '}
          ) 프론트엔드 개발
        </li>
        <li className="font-pret">프로덕트 기능 설계/에디터 · 내부 UI 라이브러리</li>
      </ul>
    </div>
  );
}
