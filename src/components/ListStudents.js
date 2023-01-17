import axios from "axios";
import React from "react";

import { Link } from "react-router-dom";


const ListStudents = (props) => {
    const { students, setStudents } = props;



    const handleDelete = (student) => {
        axios.delete(`http://localhost:3004/students/${student.id}`)
            .then((response) => {
                const filteredStudent = students.filter(item => item.id !== student.id)
                setStudents(filteredStudent)
            })
            .catch((error) => {
                console.log(error);
                alert("Kayıt Silinirken Bir Hata Oluştu.")
            })
    }

    return (
        <div className="container my-1">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Sıra no:</th>
                        <th scope="col">Öğr. no:</th>
                        <th scope="col">Ad:</th>
                        <th scope="col">Soyad:</th>
                        <th scope="col">Sınfı:</th>
                        <th scope="col">Okulu:</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.length === 0 ? (
                            <tr>
                                <td className="text-center" colSpan={7}>Henüz Kayıtlı Bir Öğrenci Yoktur.</td>
                            </tr>
                        ) : (
                            <>
                                {students.map((student, index) => (
                                    <tr key={student.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{student.studentNo}</td>
                                        <td>{student.name}</td>
                                        <td>{student.surname}</td>
                                        <td>{student.studentClass}</td>
                                        <td>{student.schoolName}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button onClick={() => handleDelete(student)} type="button" className="btn btn-sm btn-outline-danger">Sil</button>
                                                <Link to={`/edit-student/${student.id}`} type="button" className="btn btn-sm btn-outline-primary">Düzenle</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )
                    }
                </tbody>
            </table>
        </div >
    )
}

export default ListStudents; 