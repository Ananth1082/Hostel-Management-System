import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { TabsContent } from "@/Components/ui/tabs";

interface Props {
  renderCells: () => JSX.Element[];
  tabValue: string;
  tabTitle: string;
  tabDiscription: string;
  tableHeader: string[];
  isImage?: boolean;
}

export function Tab(props: Props) {
  const renderHeader = () => {
    return props.tableHeader.map((header, index) => {
      return <TableHead key={index}>{header}</TableHead>;
    });
  };
  return (
    <TabsContent value={props.tabValue}>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{props.tabTitle}</CardTitle>
          <CardDescription>{props.tabDiscription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {props.isImage?<TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>:""}
                {renderHeader()}
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{props.renderCells()}</TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  );
}
