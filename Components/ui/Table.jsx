import { createContext, useContext } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
// import Empty from "./Empty";

const TableContext = createContext();
const TableContext1 = createContext();

function Table({ children, topCard, footer }) {
  return (
    <Card className=" h-full w-full">
      {topCard}
      <CardBody className="overflow-auto px-0">
        <table className="w-full min-w-max table-auto text-left">
          {children}
        </table>
      </CardBody>
      {footer}
    </Card>
  );
}

function Header({ header }) {
  return (
    <thead>
      <tr>
        {header.map((head) => (
          <th
            key={head}
            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >
              {head}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Row({ children, index }) {
  const { length } = useContext(TableContext);

  const isLast = index === length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

  return (
    <TableContext1.Provider value={{ classes }}>
      <tr>{children}</tr>
    </TableContext1.Provider>
  );
}

function RowItem({ children }) {
  const { classes } = useContext(TableContext1);

  return (
    <>
      <td className={classes}>{children}</td>
    </>
  );
}

function Body({ data, render }) {
  const length = data?.length;

  // if (!length) return <Empty resourceName="data" />;

  return (
    <TableContext.Provider value={{ length }}>
      <tbody>{data?.map(render)}</tbody>
    </TableContext.Provider>
  );
}

function Footer({ children }) {
  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      {children}
    </CardFooter>
  );
}

function Top({ children }) {
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
      {children}
    </CardHeader>
  );
}

Table.Top = Top;
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.RowItem = RowItem;
Table.Footer = Footer;

export default Table;

//How to use
{
  /* <Table 
  topCard = <Table.Top>content<Table.top> 
  footer= <Table.Footer>footer<Table.Footer/>>
  
  <Table.Header header={[heading1 , Heading2, ..etc]}/>
  <Table.Body data={tabledata} 
  render={(data, i)=>(
    <Table.Row key=data.id index=i>
    <Table.RowItem>item1 </Table.RowItem>
    <Table.RowItem>item2 </Table.RowItem>
    </Table.Row>)
  fixeditem = <Table.RowItem>item in a row</Table.RowItem>
  }/>

    
</Table>; */
}
