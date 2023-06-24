type NavigationProps = {
    isLoggedIn: boolean
}

export default function Navigation({ isLoggedIn }: NavigationProps) {
    return (
        <div>
            <h5>Kekambas</h5>
            <ol>
                <li><a href="">Home</a></li>
                {isLoggedIn ? (
                    <>
                        <li><a href="">Log Out</a></li>
                        <li><a href="">Create Post</a></li>
                    </>
                ) : (
                    <>
                        <li><a href="">Login</a></li>
                        <li><a href="">Sign Up</a></li>
                    </>
                )}
            </ol>
        </div>
    )
}