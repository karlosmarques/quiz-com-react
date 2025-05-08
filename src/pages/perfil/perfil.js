import React from 'react';



const Perfil = () => {
    return (
        <main style={{ paddingTop: '70px' }}>
            <div className="container text-center mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                     
                            <img
                                src="/thebruxo.png"
                                className="rounded-circle mx-auto d-block mb-3"
                                alt="Foto de perfil"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <h3>Bruxo da Silva</h3>
                            <p className="text-muted">bruxoSilva@gmail.com</p><br/><br/>

                            <h4 >Quizes criados por mim:</h4><br/><br/>
                            <h4 > Quizes respondidos:</h4><br/><br/><br/><br/>
                            <div className="d-grid gap-2 d-md-block">
                                <a href="./login.html" className="btn btn-danger">
                                    Sair
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
           
        </main>
    );
};

export default Perfil;