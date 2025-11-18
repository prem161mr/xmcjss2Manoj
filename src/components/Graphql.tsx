import { Text, Link,  withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import NextLink from 'next/link';




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
  fields: {
    data: {
      datasource: ServiceField, 
           item: {
        children: {
          results: ServiceItem[];
        };
      };
    };
  };
};

const Graphql = (props: GraphQlProps) => {
  // Query results in integrated GraphQL replace the normal `fields` data
  // i.e. with { data, }
  console.log("This is Props", props)
  const { results } = props.fields.data.item.children;
    const { datasource } = props.fields.data;

  return (
    <div data-e2e-id="graphql-integrated">
      

      {datasource && (
        <div>
          <h4>List of Services</h4>
          {/* id: {datasource.id} */}
          <br />
          {/* name: {datasource.name} */}
          <br />
          {/* sample1: {datasource.sample1.value} */}
          <br />
          {/* sample1 (editable): <Text field={datasource.sample1.jsonValue} /> */}
          <br />
          {/* sample2: */}
          <br />
        </div>
      )}
      {results && (
        <div>
          {/* <h4>Route Item (via Integrated GraphQL)</h4> */}
          {/* id: {results[0].id} */}
          <br />
          {/* page title: {results[0].name} */}
          <br />
          Services:
         <div className="row">
  {results.map((child: ServiceItem) => (
    <div className="col-md-3 mb-4" key={child.id}>
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{child.name}</h5>

          <p className="card-text">
            {child.fields[0]?.value}
          </p>
        </div>

        <div className="card-footer bg-transparent border-0">
          <button className="btn btn-primary btn-sm">
            View More
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      )}
    </div>
  );
};

export default withDatasourceCheck()<GraphQlProps>(Graphql);
