import message_icon from "../assets/icons/message-icon-2.svg";

function Messages() {
  return (
    <>
      <div className="xl:px-20 lg:px-10 sm:px-10 px-6 py-10">
        <h1 className="text-3xl font-semibold">Messages</h1>
        <div className="flex justify-center h-screen">
            <div className="mt-20 w-[90%] flex flex-col items-center ">
                <img className="w-10" src={message_icon} alt="message_icon" />
                <h2 className="text-lg mt-6 font-semibold">You don{"'"}t have any messages</h2>
                <p className="text-center text-gray-600">When you receive a new message, it will appear here.</p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Messages;