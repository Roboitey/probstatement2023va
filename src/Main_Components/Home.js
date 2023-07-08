import React from 'react'

function Home() {
    return (
        <><div class="jumbotron text-center">
            <div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h2>Login or Register to our Website! </h2>

                        <br />
                        <form class="row gy-2 gx-3 align-items-center">
                            <div class="col-auto">
                                <label class="visually-hidden" for="autoSizingInput">Email or Phone</label>
                                <input type="text" class="form-control" id="autoSizingInput" placeholder="" />
                            </div>
                            <br />
                            <div class="col-auto">
                                <label class="visually-hidden" for="autoSizingInputGroup">Password</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="Password" />
                                </div>
                            </div>
                            <div class="col-auto">
                                <br />
                                <button type="button" class="btn btn-outline-info">Register? </button>
                            </div>
                            <div class="col-auto">
                                <div class="form-check">
                                    <br />
                                    <input class="form-check-input" type="checkbox" id="autoSizingCheck" />
                                    <label class="form-check-label" for="autoSizingCheck">Remember Me!</label>

                                </div>
                            </div>
                            <div class="col-auto">

                            </div>
                        </form>

                    </div>
                    <div class="col-md-6">
                        <h2>Subsites</h2>
                        <p>This is a placeholder for links to your website's subsites.</p>
                        <a class="btn btn-primary" href="#">Subsite 1</a>
                        <a class="btn btn-success" href="#">Subsite 2</a>
                    </div>
                </div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <br/>
                <div class="col-auto">
                    <label class="visually-hidden" for="autoSizingInputGroup">Password</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="Password" />
                    </div>
                </div>
                <div class="col-auto">
                    <br />
                    <button type="button" class="btn btn-outline-info">Register? </button>
                </div>
                <div class="col-auto">
                    <div class="form-check">
                        <br />
                        <input class="form-check-input" type="checkbox" id="autoSizingCheck" />
                        <label class="form-check-label" for="autoSizingCheck">Remember Me!</label>

                    </div>
                </div>
                <div class="col-auto">

                </div>
         

        </div><div class="col-md-6">
                <h2>Subsites</h2>
                <p>This is a placeholder for links to your website's subsites.</p>
                <a class="btn btn-primary" href="#">Subsite 1</a>
                <a class="btn btn-success" href="#">Subsite 2</a>
            </div></>



    )
}

export default Home