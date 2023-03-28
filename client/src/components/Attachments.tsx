import { FC, useEffect, useRef, useState } from 'react';
import Input from './Input';
import Buttons from './Buttons/Buttons';

import deleteImage from '../assets/images/delete.svg';
import downloadImage from '../assets/images/download.svg';
import popupStyles from '../assets/css/popup.module.css';
import attachmentStyles from '../assets/css/attachments.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dataFilesSelector } from '../redux/attachFiles/attachFIlesSelector';
import { deleteFileAction, getFilesAction, uploadFileAction } from '../redux/attachFiles/attachFilesSlice';
import { FullCardData } from '../types/cardTypes';
import { useNavigate } from 'react-router-dom';
export interface IAttachmentsProps {
	cardData: FullCardData | null;
}
const att = ['1_favicon.png', 2, 3, 4, 5, 6, 7, 8, 9];

const Attachments: FC<IAttachmentsProps> = (props) => {
	const [file, setFile] = useState<File | undefined>(undefined);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const files = useSelector(dataFilesSelector);
	useEffect(() => {
		console.log(props.cardData?.id);

		dispatch(getFilesAction({ id: props.cardData?.id, navigate }));
	}, []);
	console.log(files);

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
			console.log(file);
			dispatch(uploadFileAction({ id: props.cardData?.id, navigate, file: formData }));
			// Dispatch an action to start the file upload process
			// Pass the formData object as a payload to the action
		}
	};
	const uploadFile = () => {
		if (inputRef.current?.files) {
			console.log(inputRef.current?.files[0]);

			const file = inputRef.current?.files[0];
			const formData = new FormData();
			formData.append('file', file);
		}
	};
	const deleteFile = (e: any) => {
		// e.stopPropagation()
		console.log('delete', e.target.id);
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
					{files.map((el) => {
						return (
							<div key={el.id} className={attachmentStyles.fileContainer} title={`${el.file_name}`}>
								<div className={attachmentStyles.filename}>{el.file_name}</div>
								<div className={attachmentStyles.actions}>
									<a
										href={`${process.env.REACT_APP_SERVER_HOST}/files/${el.file_name}/${el.cardId}`}
										className={attachmentStyles.download}
									>
										<img src={downloadImage} alt="download" title="download" id={`${el.id}`} />
									</a>
									<div className={attachmentStyles.delete}>
										<img
											src={deleteImage}
											alt="delete"
											title="delete"
											id={`${el.id}`}
											onClick={(e) => {
												e.stopPropagation();
												deleteFile(e);
											}}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};
export default Attachments;
