import Navbar from "@/Components/Navbar";
import { Link, Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function EditNews(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const data = {
            id : props.myNews.id,
            title,
            description,
            category,
        };
        router.post("/news/update", data);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    return (
        <div className="size-full min-h-screen bg-neutral-800 text-white text-2xl">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="mx-auto items-center text-white card lg:w-96 bg-base-100 shadow-xl m-4">
                <div className="card-body size-full text-black">
                    <h1 className="text-center p-4 text-white ">Update News</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        className="bg-white m-2 input input-bordered w-full"
                        onChange={(title) => setTitle(title.target.value)}
                        defaultValue={props.myNews.title}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="bg-white m-2 input input-bordered w-full"
                        onChange={(description) =>
                            setDescription(description.target.value)
                        }
                        defaultValue={props.myNews.description}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        className="bg-white m-2 input input-bordered w-full"
                        onChange={(category) =>
                            setCategory(category.target.value)
                        }
                        defaultValue={props.myNews.category}
                    />
                    <button
                        className="m-2 btn btn-primary text-white"
                        onClick={() => handleSubmit()}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
