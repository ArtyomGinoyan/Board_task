import { FC } from 'react';
import { motion } from 'framer-motion';
import { FilesData } from '../redux/attachFiles/attachFilesSaga';

import deleteImage from '../assets/images/delete.svg';
import downloadImage from '../assets/images/download.svg';

import attachmentStyles from '../assets/css/attachments.module.css';

export interface IFileProps {
	el: FilesData;
	deleteFile: (e: any) => void;
}
const File: FC<IFileProps> = (props) => {
	const { el, deleteFile } = props;
	return (
		<motion.div
			key={el.id}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			title={`${el.file_name}`}
			transition={{ duration: 1, type: 'easeIn' }}
			className={attachmentStyles.fileContainer}
		>
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
		</motion.div>
	);
};
export default File;
