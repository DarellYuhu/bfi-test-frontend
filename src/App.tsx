import React, { useEffect, useState } from "react";

const App = () => {
  const [book, setBook] = useState<{ author: string; title: string }>({
    author: "",
    title: "",
  });
  const [data, setData] = useState([]);
  const [destination, setDestination] = useState([]);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 10 }
  );

  const handleCreate = async (e) => {
    try {
      await fetch("http://localhost:3000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      alert("book created");
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (isbn) => {
    try {
      await fetch(`http://localhost:3000/book/${isbn}`, {
        method: "DELETE",
      });

      alert("book deleted");
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  const getBook = async () => {
    try {
      const response = await fetch("http://localhost:3000/book");
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDestination = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/destination?page=${pagination.page}`
      );
      const data = await response.json();
      setDestination(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(book);
  }, [book]);

  useEffect(() => {
    getBook();
  }, []);

  useEffect(() => {
    getDestination();
    console.log(pagination);
  }, [pagination]);
  return (
    <div>
      <p>Add book</p>
      <div>
        <p>author</p>
        <input
          type="text"
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
        <p>title</p>
        <input
          type="text"
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
        <br />
        <button onClick={handleCreate}>Submit</button>
      </div>

      <div>
        <p>List of books</p>
        {data.map((item) => (
          <div style={{ border: "1px solid black" }}>
            <p>{item.author}</p>
            <p>{item.title}</p>

            <button
              onClick={(e) => {
                deleteBook(item.isbn);
                e.preventDefault();
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div>
        <p>Update book data</p>
        <p>author</p>
        <input
          type="text"
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
        <p>title</p>
        <input
          type="text"
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
        <br />
        <button onClick={handleCreate}>Submit</button>
      </div>

      <div>
        <p>List of destination</p>
        {destination.map((item) => (
          <div style={{ border: "1px solid black" }}>
            <div>{item.name}</div>
            <div>{item.country}</div>
            <div>{item.continent}</div>
          </div>
        ))}
        <input type="number" value={pagination.limit} onChange={} />
        <button
          onClick={(e) => {
            setPagination({ ...pagination, page: pagination.page - 1 });
          }}
        >
          Previous
        </button>
        <button
          onClick={(e) => {
            setPagination({ ...pagination, page: pagination.page + 1 });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
