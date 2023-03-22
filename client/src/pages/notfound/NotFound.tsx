import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const NotFound: React.FC = () => {
  return (
    <div className="main__container">
      <div className="page__container">
        <div className="page__content">
          <ErrorMessage message="404 - Page Not Found!" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
