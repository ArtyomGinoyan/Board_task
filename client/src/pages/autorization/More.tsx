import { FC } from "react";
import { Link } from "react-router-dom";

import authStyles from "./authStyles.module.css";

interface MoreProps {
  about: string;
  auth: string;
  to: string;
}

const More: FC<MoreProps> = (props) => {
  const { about, auth, to } = props;
  return (
    <div className={authStyles.more}>
      <p>
        {about}{" "}
        <Link className={authStyles.to_auth} to={to}>
          {auth}
        </Link>
      </p>
    </div>
  );
};

export default More;
