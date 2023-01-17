import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {

    const { studentId } = useParams()
    const navigate = useNavigate()

    const [willEditStudent, setWillEditStudent]=useState(null)
    const [studentNo, setStudentNo] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [studentClass, setStudentClass] = useState("")
    const [schoolName, setSchoolName] = useState("")

    const handleEdit = (event)=>{
        event.preventDefault()
        if (
            studentNo === "" || name === "" || surname === "" || studentClass === "" || schoolName === "") {
            alert("Bütün Alanları Doldurmak Zorunludur !!")
            return
        }

        const updatedStudent = {
            id: willEditStudent,
            name: name,
            surname: surname,
            studentNo: studentNo,
            studentClass: studentClass,
            schoolName: schoolName
        }
        axios.put(`http://localhost:3004/students/${willEditStudent.id}`,updatedStudent)
        .then((res)=>{
            navigate("/")
        })
        .catch((err)=>{
            console.log(err)
            alert("Kaydederken Bir Hata Oluştu.")
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3004/students/${studentId}`)
            .then((response) => {
                setWillEditStudent(response.data)
                setStudentNo(response.data.studentNo)
                setName(response.data.name)
                setSurname(response.data.surname)
                setStudentClass(response.data.studentClass)
                setSchoolName(response.data.schoolName)
            })
            .catch((error) => {
                console.log(error);
                alert("Bir Hata Oluştu")
                navigate("/")


            })
    }, [])

    if(willEditStudent === null){
        return null
    }

    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleEdit}>
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
                        <button type="submit" className="btn btn-outline-primary w-50">Güncelle</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStudent;