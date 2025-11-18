import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ServiceField = {
  name: string;
  value: string;
};

type ServiceItem = {
  id: string;
  name: string;
  fields: ServiceField[];
};

type GraphQlProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: ServiceField;
      item?: {
        children?: {
          results?: ServiceItem[];
        };
      };
    };
  };
};

const Graphql = (props: GraphQlProps) => {
  // Query results in integrated GraphQL replace the normal `fields` data
  // i.e. with { data, }
  console.log('This is Props', props);

  // Add null checks to prevent JSON parsing errors
  const results = props?.fields?.data?.item?.children?.results || [];

  // If no data available, show fallback content
  if (!props?.fields?.data) {
    return (
      <div data-e2e-id="graphql-integrated">
        <div className="container py-5">
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="row">
            {/* Default services when no GraphQL data */}
            {[
              {
                name: 'Website Development',
                icon: 'bi-globe',
                color: 'text-primary',
                desc: 'We build modern, responsive, and SEO-friendly websites tailored to your business goals.',
              },
              {
                name: 'Mobile App Development',
                icon: 'bi-phone',
                color: 'text-success',
                desc: 'We develop powerful Android and iOS mobile applications using cutting-edge frameworks.',
              },
              {
                name: 'E-Commerce Development',
                icon: 'bi-cart3',
                color: 'text-warning',
                desc: 'We deliver high-quality, secure, and feature-rich e-commerce platforms.',
              },
            ].map((service, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <i className={`bi ${service.icon} fs-1 mb-3 ${service.color}`}></i>
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text">{service.desc}</p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button className="btn btn-primary btn-sm">View More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-e2e-id="graphql-integrated">
      <div className="container py-5">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row">
          {results && results.length >= 6 ? (
            // Display the first 6 services with specific icons and content
            <>
              {/* Service 1 - Website Development */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-globe fs-1 mb-3 text-primary"></i>
                    <h5 className="card-title">{results[0]?.name || 'Website Development'}</h5>
                    <p className="card-text">
                      {results[0]?.fields[0]?.value ||
                        'We build modern, responsive, and SEO-friendly websites tailored to your business goals. Every website is crafted with clean code, fast-loading structure, and an easy-to-navigate layout to ensure a seamless user experience.'}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button className="btn btn-primary btn-sm">View More</button>
                  </div>
                </div>
              </div>

              {/* Service 2 - Mobile App Development */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-phone fs-1 mb-3 text-success"></i>
                    <h5 className="card-title">{results[1]?.name || 'Mobile App Development'}</h5>
                    <p className="card-text">
                      {results[1]?.fields[0]?.value ||
                        'We develop powerful Android and iOS mobile applications using cutting-edge frameworks and scalable architectures. Each app is designed with an intuitive interface, smooth navigation, and advanced security.'}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button className="btn btn-primary btn-sm">View More</button>
                  </div>
                </div>
              </div>

              {/* Service 3 - E-Commerce Development */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-cart3 fs-1 mb-3 text-warning"></i>
                    <h5 className="card-title">{results[2]?.name || 'E-Commerce Development'}</h5>
                    <p className="card-text">
                      {results[2]?.fields[0]?.value ||
                        'We deliver high-quality, secure, and feature-rich e-commerce platforms that help businesses sell more effectively online. Our solutions include product management, secure payment gateways, and order tracking.'}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button className="btn btn-primary btn-sm">View More</button>
                  </div>
                </div>
              </div>

              {/* Service 4 - Custom Software Solutions */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-gear-fill fs-1 mb-3 text-info"></i>
                    <h5 className="card-title">
                      {results[3]?.name || 'Custom Software Solutions'}
                    </h5>
                    <p className="card-text">
                      {results[3]?.fields[0]?.value ||
                        'We design and develop customized software tailored to solve unique business challenges. From ERP systems and CRM solutions to workflow automation and data management tools.'}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button className="btn btn-primary btn-sm">View More</button>
                  </div>
                </div>
              </div>

              {/* Service 5 - Digital Marketing & SEO */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-graph-up-arrow fs-1 mb-3 text-danger"></i>
                    <h5 className="card-title">{results[4]?.name || 'Digital Marketing & SEO'}</h5>
                    <p className="card-text">
                      {results[4]?.fields[0]?.value ||
                        'We provide complete digital marketing services to help businesses improve visibility, attract targeted traffic, and achieve higher conversions. Our strategies include SEO, Google Ads, and social media marketing.'}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button className="btn btn-primary btn-sm">View More</button>
                  </div>
                </div>
              </div>

              {/* Service 6 - UI/UX Design & Branding */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-palette fs-1 mb-3 text-secondary"></i>
                    <h5 className="card-title">{results[5]?.name || 'UI/UX Design & Branding'}</h5>
                    <p className="card-text">
                      {results[5]?.fields[0]?.value ||
                        'We deliver creative and user-centric UI/UX design solutions that elevate the overall digital experience. Our design process focuses on simplicity, clarity, and functionality.'}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button className="btn btn-primary btn-sm">View More</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Fallback for when there are fewer than 6 services or no services
            results &&
            results.map((child: ServiceItem, index: number) => {
              const icons = [
                'bi-globe',
                'bi-phone',
                'bi-cart3',
                'bi-gear-fill',
                'bi-graph-up-arrow',
                'bi-palette',
              ];
              const colors = [
                'text-primary',
                'text-success',
                'text-warning',
                'text-info',
                'text-danger',
                'text-secondary',
              ];
              const iconClass = icons[index % icons.length];
              const colorClass = colors[index % colors.length];

              return (
                <div className="col-md-4 mb-4" key={child.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <i className={`bi ${iconClass} fs-1 mb-3 ${colorClass}`}></i>
                      <h5 className="card-title">{child.name}</h5>
                      <p className="card-text">{child.fields[0]?.value}</p>
                    </div>
                    <div className="card-footer bg-transparent border-0 text-center">
                      <button className="btn btn-primary btn-sm">View More</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<GraphQlProps>(Graphql);
