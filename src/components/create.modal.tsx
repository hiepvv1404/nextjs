'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (show: boolean) => void;
}
const CreateModal = (props: IProps) => {
  const { showModalCreate, setShowModalCreate } = props;

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');

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
    // toast.success('Create succeed!');
  };

  const handleCloseModal = () => {
    setTitle('');
    setAuthor('');
    setContent('');
    setShowModalCreate(false);
  };

  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new a Blog</Modal.Title>
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
          <Button variant="primary" onClick={() => handleOnSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateModal;
