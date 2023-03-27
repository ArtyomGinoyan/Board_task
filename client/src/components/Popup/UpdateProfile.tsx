import { FC, useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../Input';
import Button from '../Buttons/Button';
import CloseButton from '../Buttons/CloseButton';

import { userSelector } from '../../redux/auth/authSelector';
import { updateProfileAction } from '../../redux/auth/authSlice';
import popupStyles from '../../assets/css/popup.module.css';

export interface IUpdateProfileProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfile: FC<IUpdateProfileProps> = (props) => {
	const { setIsOpen } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(userSelector);
	const nameRef = useRef<HTMLInputElement>(user.name);
	const emailRef = useRef<HTMLInputElement>(user.email);
	const oldPassRef = useRef<HTMLInputElement>(null);
	const newPassRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<CloseButton setIsOpen={setIsOpen} />
			<div className={popupStyles.formWrap}>
				<div className={popupStyles.cardInfo}>
					<h2>Update Profile</h2>
				</div>
				<div className={popupStyles.formNameWrap}>
					<label htmlFor="name">Name</label>
					<Input
						id="name"
						type="text"
						inputRef={nameRef}
						defaultValue={user.name}
						className={popupStyles.formInput}
						classContainer={popupStyles.formInputWrap}
					/>
				</div>
				<div className={popupStyles.formNameWrap}>
					<label htmlFor="Email">Email</label>
					<Input
						id="Email"
						type="email"
						inputRef={emailRef}
						defaultValue={user.email}
						className={popupStyles.formInput}
						classContainer={popupStyles.formInputWrap}
					/>
				</div>
				<div className={popupStyles.formNameWrap}>
					<label htmlFor="oldPassword">Old password</label>
					<Input
						required={true}
						type="password"
						id="oldPassword"
						inputRef={oldPassRef}
						autoComplete="new-password"
						className={popupStyles.formInput}
						classContainer={popupStyles.formInputWrap}
					/>
				</div>
				<div className={popupStyles.formNameWrap}>
					<label htmlFor="newPassword">New password</label>
					<Input
						required={true}
						type="password"
						id="newPassword"
						inputRef={newPassRef}
						autoComplete="new-password"
						className={popupStyles.formInput}
						classContainer={popupStyles.formInputWrap}
					/>
				</div>
			</div>
			<div className={popupStyles.buttonContainer}>
				<Button
					onClick={(e) => {
						if (oldPassRef.current?.value === '') {
							oldPassRef.current.focus();
							toast.error('Fill old password field');
						}
						if (newPassRef.current?.value === '') {
							newPassRef.current.focus();
							toast.error('Fill out new password field');
						}
						if (oldPassRef.current?.value !== '' && newPassRef.current?.value !== '') {
							dispatch(
								updateProfileAction({
									...user,
									name: nameRef.current.value,
									email: emailRef.current.value,
									newPassword: newPassRef.current?.value,
									oldPassword: oldPassRef.current?.value,
									navigate: navigate,
								})
							);
							setIsOpen(false);
						}
					}}
					buttonName="update"
					className={popupStyles.button}
					classContainer={popupStyles.buttonWrap}
				/>
			</div>
		</>
	);
};
export default UpdateProfile;
