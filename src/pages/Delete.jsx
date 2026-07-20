import { useParams } from "react-router-dom";
import DeleteContainer from "../components/DeleteContainer.jsx";
import { config } from "../lib/config.jsx";

export default function Delete() {
    const { id } = useParams();

    return (
        <>
            <h1>{config.DELETE.title}</h1>
            <DeleteContainer id={id} />
        </>
    );
}
