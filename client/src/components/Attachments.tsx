import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import File from './File';
import Input from './Input';
import Buttons from './Buttons/Buttons';

import { dataFilesSelector } from '../redux/attachFiles/attachFIlesSelector';
import {
	deleteFileAction,
	getFilesAction,
	resetFilesData,
	uploadFileAction,
} from '../redux/attachFiles/attachFilesSlice';
import { FullCardData } from '../types/cardTypes';

import popupStyles from '../assets/css/popup.module.css';
import attachmentStyles from '../assets/css/attachments.module.css';

export interface IAttachmentsProps {
	cardData: FullCardData | null;
}

const Attachments: FC<IAttachmentsProps> = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const files = useSelector(dataFilesSelector);
	const inputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | undefined>(undefined);
	useEffect(() => {
		dispatch(getFilesAction({ id: props.cardData?.id, navigate }));
		return () => {
			dispatch(resetFilesData());
		};
	}, []);

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (file) {
			const formData = new FormData();
			formData.append('file', file);
			dispatch(uploadFileAction({ id: props.cardData?.id, navigate, file: formData }));
		}
	};
	const deleteFile = (e: any) => {
		const file = files.filter((el) => el.id === +e.target.id);
		dispatch(deleteFileAction({ file: file[0], navigate }));
	};
	const clearFile = (e: any) => {
		if (inputRef.current?.value) {
			inputRef.current.value = '';
		}
	};
	return (
		<>
			<form className={popupStyles.formNameWrap} onSubmit={handleSubmit}>
				<Input
					onChange={handleFileInputChange}
					inputRef={inputRef}
					type="file"
					className={popupStyles.formInput}
					classContainer={popupStyles.formInputWrap}
				/>
				<Buttons clearValue={clearFile} getValue={handleSubmit} />
			</form>
			<div className={attachmentStyles.container}>
				<div className={attachmentStyles.wrap}>
					{!files.length ? (
						<h3>No files yet</h3>
					) : (
						files.map((el) => {
							return <File el={el} deleteFile={deleteFile} />;
						})
					)}
				</div>
			</div>
		</>
	);
};
export default Attachments;
