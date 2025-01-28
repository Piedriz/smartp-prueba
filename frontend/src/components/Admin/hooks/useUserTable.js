import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../../services/userService";

export const useUserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // Configura react-hook-form

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role !== "admin") {
        alert("Usted no es admin");
        navigate("/");
      }
    }

    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };

    fetchUsers();
  }, [navigate]);

  const onSubmit = async (data) => {
    if (isEditing) {
      const updatedUser = await updateUser({ ...currentUser, ...data });
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === updatedUser.user.id ? updatedUser.user : u
        )
      );
      setIsEditing(false);
      setCurrentUser(null);
      window.alert(updatedUser.message);
    } else {
      const newUser = await createUser(data);
      window.alert(newUser.message);
      setUsers((prevUsers) => [...prevUsers, newUser.user]);
    }

    reset({
      name: "",
      email: "",
      role: "",
      password: "",
    });
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    reset({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentUser(null);
    reset({
      name: "",
      email: "",
      role: "",
    });
  };

  const handleDeleteUser = async (userId) => {
    const response = await deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    window.alert(response.message);
  };

  return {
    users,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleEditUser,
    handleCancelEdit,
    handleDeleteUser,
    isEditing,
    currentUser,
  };
};
