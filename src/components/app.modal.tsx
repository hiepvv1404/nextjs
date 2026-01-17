'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  mode: 'create' | 'edit';
  blog?: IBlog;
  setBlog: (blog: IBlog | undefined) => void;
}
const AppModal = (props: IProps) => {
  const { showModal, setShowModal, mode, blog, setBlog } = props;

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (mode === 'edit' && blog) {
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
      setId(blog.id);
    }
  }, [mode, blog]);

  const handleOnSubmit = () => {
    try {
      if (!title || !author || !content) {
        toast.error('Title, Author and Content are required!');
        return;
      }
      fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, content }), // { title: title, author: author, content: content}
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.id) {
            toast.success('Create succeed!');
            handleCloseModal();
            mutate('http://localhost:8000/blogs'); // truyền vào key để load lại data
          }
        });
    } catch (error) {
      toast.error('Create failed!');
      return;
    }
  };

  const handleOnUpdate = () => {
    try {
      if (!title || !author || !content) {
        toast.error('Title, Author and Content are required!');
        return;
      }
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, content }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.id) {
            toast.success('Update succeed!');
            handleCloseModal();
            mutate('http://localhost:8000/blogs');
          }
        });
    } catch (error) {
      toast.error('Update failed!');
      return;
    }
  };
  const handleCloseModal = () => {
    setTitle('');
    setAuthor('');
    setContent('');
    setBlog(undefined); // vì useEffect set lại giá trị khi thay đổi blog, nên khi đóng modal cần reset về undefined để lần mở modal sau không bị dính dữ liệu cũ
    setShowModal(false);
  };
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'create' ? 'Add new a Blog' : 'Edit a Blog'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter blog author..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter blog content..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => (mode === 'create' ? handleOnSubmit() : handleOnUpdate())}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppModal;
