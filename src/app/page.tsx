import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableHead, TableCell, TableRow, TableBody, TableHeader} from "@/components/ui/table";
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox";

export default function Home() {
  return (
      <>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="grid gap-1">
            <CardTitle>Uptime Bot</CardTitle>
            <CardDescription>Monitoring the availability of various services</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-semibold">99.9%</div>
              <div className="grid gap-1 text-center">
                <div className="font-semibold">Uptime</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Calculated over the last 30 days</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="flex items-center justify-center p-6">
            <div className="grid gap-1 text-center">
              <div className="font-semibold">Add Service</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Start monitoring a new service</div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-2">
            <MonitorIcon className="w-6 h-6" />
            <CardTitle>Monitors</CardTitle>
            <Button className="ml-auto" size="xs" variant="outline">
              Add
              <span className="sr-only">New Monitor</span>
              <PlusIcon className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead />
                  <TableHead>Service</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Last Check</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>API</TableCell>
                  <TableCell>GET</TableCell>
                  <TableCell>2m ago</TableCell>
                  <TableCell>
                    <CheckCircleIcon className="w-4 h-4" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>Website</TableCell>
                  <TableCell>PING</TableCell>
                  <TableCell>5m ago</TableCell>
                  <TableCell>
                    <CheckCircleIcon className="w-4 h-4" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>Database</TableCell>
                  <TableCell>Docker</TableCell>
                  <TableCell>1m ago</TableCell>
                  <TableCell>
                    <AlertTriangleIcon className="w-4 h-4" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </>
  )
}

function AlertTriangleIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
  )
}


function CheckCircleIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
  )
}


function MonitorIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
  )
}


function PlusIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
  )
}
