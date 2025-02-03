// import { MoreHorizontal, Table } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Popover } from '@mui/material';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from '../ui/avatar';
import { Popover } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';

// const { companies, searchCompanyByText } = useSelector(store => store.company);
// const [filterCompany, setFilterCompany] = useState(companies);
// const navigate = useNavigate();
// useEffect(() => {
//     const filteredCompany = companies.length >= 0 && companies.filter((company) => {
//         if (!searchCompanyByText) {
//             return true
//         };
//         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

//     });
//     setFilterCompany(filteredCompany);
// }, [companies, searchCompanyByText])
const CompaniesTable = () => {
    return (
        <div className=''>
            <Table>
                <TableCaption>A list of your recent fdfaa registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {
                    filterCompany?.map((company) => ( */}
                    <tr>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src="" />
                            </Avatar>
                        </TableCell>
                        <TableCell>ffdfad</TableCell>
                        <TableCell>fdfas</TableCell>
                        <TableCell className="text-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {/* <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                        <Edit2 className='w-4' />
                                        <span>Edit</span>
                                    </div> */}
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </tr>

                    {/* )) */}
                    {/* } */}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable