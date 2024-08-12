import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };
        router.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    useEffect(() => {
        if (!props.myNews) {
            router.get("/news");
        }
        return;
    }, []);

    return (
        <AuthenticatedLayout
            user={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My News
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {isNotif && (
                            <div
                                role="alert"
                                className="alert alert-success text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{props.flash.message}</span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Title"
                            className="bg-white m-2 input input-bordered w-full"
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="bg-white m-2 input input-bordered w-full"
                            onChange={(description) =>
                                setDescription(description.target.value)
                            }
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="bg-white m-2 input input-bordered w-full"
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <button
                            className="m-2 btn btn-primary text-white"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="p-4">
                        {props.myNews && props.myNews.length > 0 ? (
                            props.myNews.map((news, i) => {
                                return (
                                    <div className="bg-white card lg:w-96 bg-base-100 shadow-xl m-4">
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {news.title}
                                            </h2>
                                            <p>{news.description}</p>
                                            <div className="card-actions justify-end">
                                                <div className="badge badge-inline">
                                                    {news.category}
                                                </div>
                                                <div className="badge badge-outline">
                                                    <Link
                                                        href={route(
                                                            "edit.news"
                                                        )}
                                                        method="get"
                                                        data={{ id: news.id }}
                                                        as="button"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                                <div className="badge badge-outline">
                                                    <Link
                                                        href={route(
                                                            "delete.news"
                                                        )}
                                                        method="post"
                                                        data={{ id: news.id }}
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>You doesn't post a news yet</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
