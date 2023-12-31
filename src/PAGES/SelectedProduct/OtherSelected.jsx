// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { HiOutlineHome } from 'react-icons/hi';
import { AuthContext } from '../Contexts/UserContext';

const OtherSelected = () => {
    const { user } = useContext(AuthContext);
    console.log("Context: ", user);
    const { catagory } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ["other"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4000/other/${catagory}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleSelected = (id) => {
        navigate(`/products/${id}`);
    }
    return (
        <>
            <div className='flex lg:flex-row lg:justify-start sm:flex-col sm:justify-center items-center gap-20 p-6'>
                <button onClick={() => navigate('/')} className='btn btn-sm btn-warning'>
                    <HiOutlineHome></HiOutlineHome>Home</button>
                {/* {user?.displayName && <span>Welcome {user.displayName}</span>} */}
                <h1 className='uppercase text-2xl font-serif font-bold'>Explore Our {catagory} </h1>
            </div>
            <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-2 my-5'>

                {
                    data.map(other => <div key={other._id} className="card lg:w-96 sm:w-full glass shadow-xl">
                        <figure className='transition ease-in-out delay-100 hover:translate-x-4 hover:scale-110 duration-300 overflow-hidden mt-3'>
                            <img onClick={() => handleSelected(other._id)} src={other.image} alt="car!" className='rounded-xl max-w-xs' /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{other.name.toUpperCase()}</h2>
                            <p>Catagory:{other.catagory}</p>
                            <p>{other.description.slice(0, 55)}...</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-sm btn-success"
                                    onClick={() => handleSelected(other._id)}
                                >Learn More</button>
                            </div>
                        </div>
                    </div>)
                }

            </div>

        </>
    );
};

export default OtherSelected;