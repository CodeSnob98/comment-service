import { useState } from "react";

export default function Comment(props) {
  const [showIp, setShowIp] = useState(false);
  const [showComment, setShowComment] = useState(true);
  const [myVal, setMyVal] = useState("");
  const [replyClicked, setReplyClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  function replyToComment() {
    if (!showIp) {
      setShowIp(true);
      setReplyClicked(true);
    } else {
      if (myVal) {
        props.reply(props.data.id, myVal);
        setShowIp(false);
        setReplyClicked(false);
      } else {
        alert("can send empty text");
      }
    }
  }

  function editComment() {
    if (!showIp) {
      setShowIp(true);
      setShowComment(false);
      setMyVal(props.data.comment);
      setEditClicked(true);
    } else {
      if (myVal) {
        props.edit(props.data.id, myVal);
        setShowIp(false);
        setShowComment(true);
        setEditClicked(false);
        setMyVal("");
      } else {
        alert("can set empty text");
      }
    }
  }
  function deletComment() {
    props.delete(props.data.id);
  }
  function cancel() {
    setShowIp(false);
    setShowComment(true);
    setEditClicked(false);
  }
  return (
    <div className="display-row">
      {showComment && <p>{props.data.comment}</p>}
      {showIp && (
        <input
          type="text"
          onChange={(e) => {
            setMyVal(e.target.value);
          }}
          value={myVal}
        />
      )}
      <button className="delete-com" onClick={deletComment}>
        Delete
      </button>

      {!editClicked && (
        <button className="add-reply-com" onClick={replyToComment}>
          Reply
        </button>
      )}

      {!replyClicked && (
        <button className="add-reply-com" onClick={editComment}>
          Edit
        </button>
      )}

      {showIp && (
        <button className="add-reply-com" onClick={cancel}>
          Cancel
        </button>
      )}
    </div>
  );
}
