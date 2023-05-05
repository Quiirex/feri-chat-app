import More from '../../assets/more.png';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>User display name</span>
        <div className="chatIcons">
          <img src={More} alt="" />
          {/* TODO replace with icon */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
