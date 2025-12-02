'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/userSlice';
import { Camera, LogOut, X } from 'lucide-react';
import type { RootState } from '@/store/index';
import { updateUser } from '@/store/slices/userSlice';

const ProfileSettings = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [formData, setFormData] = useState({
		name: user?.name || '',
		username: user?.username || '',
	});

	useEffect(() => {
		setFormData({
			name: user?.name || '',
			username: user?.username || '',
		});
	}, [user]);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Validate file size (5MB max)
			if (file.size > 5 * 1024 * 1024) {
				alert('File size must be less than 5MB');
				return;
			}

			// Validate file type
			if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
				alert('Only JPG, PNG, and GIF files are allowed');
				return;
			}

			setImageFile(file);

			// Create preview URL
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setProfileImage(null);
		setImageFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleSave = async () => {
		const idNum : any =
			typeof user?.id === 'string' ? Number(user?.id) : user?.id;

		console.log(idNum);
		console.log(user);

		try {
			const result = await dispatch(
				updateUser({
					id: idNum,
					updates: {
						name: formData.name,
						username: formData.username,
					},
				})
			).unwrap();

			// update local form with returned user (optional)
			setFormData({
				name: result.name || '',
				username: result.username || '',
			});

			setIsEditing(false);
		} catch (error) {
			console.error('Failed to update user:', error);
		}
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const getInitials = () => {
		if (user?.name) {
			return user.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2);
		}
		return user?.username?.slice(0, 2).toUpperCase() || 'U';
	};

	return (
		<Card className='overflow-hidden'>
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>
					Manage your profile settings and account information
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-8'>
				{/* Profile Picture Section */}
				<div>
					<h3 className='text-sm font-medium mb-4'>Profile Picture</h3>
					<div className='flex items-center gap-6'>
						<div className='relative'>
							<Avatar className='h-24 w-24'>
								<AvatarImage src={profileImage || undefined} />
								<AvatarFallback className='text-2xl'>
									{getInitials()}
								</AvatarFallback>
							</Avatar>
							{profileImage && (
								<Button
									variant='destructive'
									size='icon'
									className='absolute -top-2 -right-2 h-6 w-6 rounded-full cursor-pointer'
									onClick={handleRemoveImage}
								>
									<X className='h-3 w-3' />
								</Button>
							)}
						</div>
						<div className='space-y-2'>
							<input
								ref={fileInputRef}
								type='file'
								accept='image/jpeg,image/jpg,image/png,image/gif'
								onChange={handleImageSelect}
								className='hidden'
								id='profile-image-input'
							/>
							<Button
								variant='outline'
								size='sm'
								onClick={() => fileInputRef.current?.click()}
								type='button'
								className='cursor-pointer'
							>
								<Camera className='mr-2 h-4 w-4' />
								Change Photo
							</Button>
							<p className='text-xs text-muted-foreground'>
								JPG, PNG or GIF. Max 5MB.
							</p>
						</div>
					</div>
				</div>

				<Separator />

				{/* Basic Info Section */}
				<div>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-sm font-medium'>Basic Information</h3>
						{!isEditing && (
							<Button
								variant='ghost'
								size='sm'
								onClick={() => setIsEditing(true)}
							>
								Edit
							</Button>
						)}
					</div>

					<div className='space-y-4'>

							<div className='grid gap-2'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									disabled={!isEditing}
									placeholder='Your name'
								/>
							</div>


						<div className='grid gap-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								value={formData.username}
								onChange={(e) =>
									setFormData({ ...formData, username: e.target.value })
								}
								disabled={!isEditing}
								placeholder='Your username'
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='user-id'>User ID</Label>
							<Input
								id='user-id'
								value={user?.id || 'N/A'}
								disabled
								className='text-muted-foreground'
							/>
						</div>

						{isEditing && (
							<div className='flex gap-2 pt-2'>
								<Button
									className='cursor-pointer'
									onClick={handleSave}
									size='sm'
								>
									Save Changes
								</Button>
								<Button
									className='cursor-pointer'
									variant='outline'
									size='sm'
									onClick={() => {
										setIsEditing(false);
										setFormData({
											name: user?.name || '',
											username: user?.username || '',
										});
										handleRemoveImage();
									}}
								>
									Cancel
								</Button>
							</div>
						)}
					</div>
				</div>

				<Separator />

				<div>
					<div className='space-y-3'>
						<Button
							variant='destructive'
							size='sm'
							onClick={handleLogout}
							className='w-full sm:w-auto cursor-pointer'
						>
							<LogOut className='mr-2 h-4 w-4' />
							Log Out
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileSettings;
