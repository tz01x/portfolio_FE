import styles from './header.module.css';

export interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * This component was generated using Codux's built-in Default new component template.
 * For details on on how to create custom new component templates, see https://help.codux.com/kb/en/article/configuration-for-headers-and-templates
 */
export const Header = ({ className, children = 'Header' }: HeaderProps) => {
  return (
    <div className={styles.header_root + ' ' + className}>
      <nav className={'mx-auto w-[90%] md:w-3/4 ' + styles['navbar']}>
        <a href='/' className={styles['brand-name']}>
          <div className={styles['glitch-wrapper']}>
            <div className={styles['glitch']}>Tz</div>
          </div>
        </a>
        <div className={styles['navbar-btn']}>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="30"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg> */}
          <ul className='flex gap-3 text-[var(--secondary-color)] fontFamilyLexend'>
          
            <li>
              <a href="/blogs">Blogs</a>
            </li>
            <li>
              <a href="/#contact" className='p-2 px-4 rounded-full bg-[var(--primary-color)] text-[var(--seconday-color)]'>
                Contract me

              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
