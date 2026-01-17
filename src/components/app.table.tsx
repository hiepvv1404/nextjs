'use client';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import AppModal from './app.modal';
import Link from 'next/link';

interface IProps {
  blogs: IBlog[];
}

const AppTable = (props: IProps) => {
  const { blogs } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [blog, setBlog] = useState<IBlog | undefined>(undefined);

  return (
    <>
      <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Table blogs</h3>
        <Button
          variant="primary"
          onClick={() => {
            setShowModal(true);
            setMode('create');
            setBlog(undefined);
          }}
        >
          Add new
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog, index) => (
            <tr key={blog.id}>
              <td>{index + 1}</td>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>
                <Link className="btn btn-secondary" href={`/blogs/${blog.id}`}>
                  View
                </Link>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => {
                    setMode('edit');
                    setBlog(blog);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AppModal
        showModal={showModal}
        setShowModal={setShowModal}
        mode={mode}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
};

export default AppTable;
