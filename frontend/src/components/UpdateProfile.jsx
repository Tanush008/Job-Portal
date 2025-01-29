import React, { useState } from 'react';
// import { Button } from './ui/button';
// import { DialogContent, DialogTitle } from './ui/dialog';
// import { Avatar } from './ui/avatar';
// import { Box } from 'lucide-react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Avatar,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from '@/hooks/use-toast';
import store from '@/redux/store';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 16,
        background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
}));

const UpdateProfile = ({ open, setOpen }) => {
    // const [open, setOpen] = useState(false);
    const [Loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const fileChange = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle profile update logic here
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/Update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                // toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);

        }
        console.log(input);

        handleClose();
    };

    return (
        <div>
            {/* <Button
                variant="contained"
                onClick={handleOpen}
                startIcon={<EditIcon />}
                sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                }}
            >
                Update Profile
            </Button> */}

            <StyledDialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                TransitionProps={{
                    timeout: 400,
                }}
            >
                <DialogTitle
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    Update Your Profile
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                        }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    border: '4px solid #fff',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                }}
                            />
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: '#2196F3',
                                    '&:hover': { backgroundColor: '#1976D2' },
                                }}
                                size="small"
                            >
                                <CameraAltIcon sx={{ color: 'white' }} onChange={fileChange} />
                            </IconButton>
                        </Box>

                        <TextField
                            fullWidth
                            label="fullname"
                            name="fullname"
                            value={input.fullname}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ mt: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Bio"
                            name="bio"
                            value={input.bio}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={4}
                        />

                        <TextField
                            fullWidth
                            label="skills"
                            name="skills"
                            type="skills"
                            value={input.skills}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: '#666',
                            '&:hover': { backgroundColor: '#f5f5f5' },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                            },
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </StyledDialog>
        </div>
    );
};

export default UpdateProfile;