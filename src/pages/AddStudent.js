import axios from "axios";
import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const navigate = useNavigate()
    const [studentNo, setStudentNo] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [studentClass, setStudentClass] = useState("")
    const [schoolName, setSchoolName] = useState("")



    const handleSave = (event) => {
        event.preventDefault()
        //validation
        if (
            studentNo === "" || name === "" || surname === "" || studentClass === "" || schoolName === "") {
            alert("Bütün Alanları Doldurmak Zorunludur !!")
            return
        }

        const newStudent = {
            id: String(new Date().getTime()),
            name: name,
            surname: surname,
            studentNo: studentNo,
            studentClass: studentClass,
            schoolName: schoolName
        }

        axios.post("http://localhost:3004/students", newStudent)
            .then((response) => {
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
                alert("Öğrenci Kaydedilirken Bir Sorun oluştu.")
            })

    }


    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleSave}>
                    <div className="mb-3">
                        <label htmlFor="studentNo" className="form-label">Öğrenci Numarası:</label>
                        <input value={studentNo} onChange={(event) => setStudentNo(event.target.value)} type="number" className="form-control" id="studentNo" placeholder="Ör: 542" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Öğrenci Adı:</label>
                        <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="name" placeholder="Ör: Emre" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Öğrenci Soyadı:</label>
                        <input value={surname} onChange={(event) => setSurname(event.target.value)} type="text" className="form-control" id="surname" placeholder="Ör: Trabzonlu" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="studentClass" className="form-label">Öğrenci Sınıfı:</label>
                        <input value={studentClass} onChange={(event) => setStudentClass(event.target.value)} type="text" className="form-control" id="studentClass" placeholder="Ör: 5/E" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="schoolName" className="form-label">Okul Adı:</label>
                        <input value={schoolName} onChange={(event) => setSchoolName(event.target.value)} type="text" className="form-control" id="schoolName" placeholder="Ör: Donanma İ.Ö.O." />
                    </div>
                    <div className="my-5 d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary w-50">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudent;