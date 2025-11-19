import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

// TYPES
type MenuItem = {
  id: string;
  name: string;
  displayName: string;
  url?: { path: string };
  field: { value: string } | null;
};

type NavbarProps = ComponentProps & {
  fields: ComponentProps['fields'] & {
    data?: {
      item: {
        id: string;
        name: string;
        children: { results: MenuItem[] };
      };
    };
  };
};

const Navbar = (props: NavbarProps) => {
  const results = props.fields?.data?.item?.children?.results || [];

  const menuItems = results
    .filter((item) => item.field !== null)
    .map((item) => ({
      id: item.id,
      title: item.displayName || item.name,
      url: item.url?.path || `/${item.name.toLowerCase()}`,
    }));

  return (
    <nav className="navbar navbar-expand-lg text-dark shadow-sm sticky-top" >
      <div className="container">
        {/* Brand */}
        <a style={{marginLeft:16}} className="navbar-brand fw-bold fs-3" href="/">
          XMCJSS
        </a>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav" style={{marginLeft:700}}>
          <ul className="navbar-nav ms-auto" >
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a className="nav-link fw-semibold px-3" href={item.url}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withDatasourceCheck()<NavbarProps>(Navbar);
