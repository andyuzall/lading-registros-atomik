import React, { useEffect, useState } from 'react'
import style from '../form/form.css';
import { Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Footer from '../footer/Footer';
import { formSchema } from '../schema/validation';


const Form = ({ userData }) => {

    const [categorias, setCategorias] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        categoria: '',
        subCategoria: '',
        tipoSubCategoria: '',
        subTipo: '',
        pais: '',
        costo: '',
        observaciones: ''
    })
    useEffect(() => {
        fetch('data/categoria.json')
        .then(res => res.json())
        .then(data => setCategorias(data))
        .catch(error => console.error('Error al cargar las categorias:', error));
    }, []);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value});
        if (id === 'categoria') {
          setSelectedOption(value);
        }
      }

      const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
        setSending(true);
        try {
          const validationResult = formSchema.safeParse(formData)

          if(validationResult.success) {

          const formEle = document.querySelector("form");
          const dataBase = new FormData(formEle);
          
          const currentDate = new Date();
          dataBase.append('fechaRegistro', currentDate.toISOString());

          const res = await fetch('https://script.google.com/macros/s/AKfycbyWb7XGDQe2TA5Y41kg_l4gCECFPEROnVKx1FxJxIcAonV8iZE9kX2CNupDKeKGDhpD/exec', {
            method: "POST",
            body: dataBase
          });
          if (res.ok) {
            setFormData({
              categoria: '',
              subCategoria: '',
              tipoSubCategoria: '',
              subTipo: '',
              pais: '',
              costo: '',
              observaciones: ''
          });
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false); 
            }, 3000);
          } else {
            throw new Error('Error al enviar los datos');
          }
        } else {
          console.error('Errores de validación:', validationResult.error);
        }
        } catch (error) {
          console.log(error);
        };
        setSending(false);
      }
    

  return (
    <div>
        <form id='form' onSubmit={handleSubmit} required>
            <div className='divs-form'>
             <label htmlFor="" className='divs-form'>
               <Typography
               component='h3'
               variant='h3'
               >
                Registro de Gastos
               </Typography>
                <select 
                className='input'
                type='text'
                name='categoria' 
                id='categoria'
                value={formData.categoria}
                onChange={handleInputChange}
                required>
                    <option value="">Seleccione la categoria</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
                    ))}
                </select>
             </label>
             {selectedOption && (
                        <>
                        {categorias.map(categoria => (
                            selectedOption === categoria.nombre && categoria["subCategoria"] && (
                                <div className='divs-form' key={categoria.id}>
                                    <label htmlFor="subCategoria" className='divs-form'>
                                        <select
                                            className='input'
                                            type='type'
                                            onChange={handleInputChange}
                                            name='subCategoria'
                                            id='subCategoria'
                                            value={formData.subCategoria}
                                            required
                                        >
                                            <option value="">Seleccione la subcategoría</option>
                                            {categoria["subCategoria"].map(subcategoria => (
                                                <option key={subcategoria.id} value={subcategoria.nombre}>{subcategoria.nombre}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )
                        ))}
                         {categorias.map(categoria => (
                          selectedOption === categoria.nombre && categoria["subCategoria"] && formData.subCategoria && (
                              categoria["subCategoria"].map(subcategoria => (
                                  formData.subCategoria === subcategoria.nombre && subcategoria["tipo"] && (
                                      <div className='divs-form' key={subcategoria.id}>
                                          <label htmlFor="tipoSubCategoria" className='divs-form'>
                                              <select
                                                  className='input'
                                                  type='type'
                                                  onChange={handleInputChange}
                                                  name='tipoSubCategoria'
                                                  id='tipoSubCategoria'
                                                  value={formData.tipoSubCategoria}
                                                  required
                                              >
                                                  <option value="">Seleccione el tipo de subcategoría</option>
                                                  {subcategoria["tipo"].map(tipo => (
                                                      <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                                                  ))}
                                              </select>
                                          </label>
                                      </div>
                                    )
                                ))
                            )
                        ))}
                        {categorias.map(categoria => (
                        selectedOption === categoria.nombre && categoria["subCategoria"] && formData.subCategoria && formData.tipoSubCategoria && (
                            categoria["subCategoria"].map(subcategoria => (
                                formData.subCategoria === subcategoria.nombre && subcategoria["tipo"] && (
                                    subcategoria["tipo"].map(tipo => (
                                        formData.tipoSubCategoria === tipo.nombre && tipo["subTipo"] && (
                                            <div className='divs-form' key={tipo.id}>
                                                <label htmlFor="subTipo" className='divs-form'>
                                                    <select
                                                        className='input'
                                                        type='type'
                                                        onChange={handleInputChange}
                                                        name='subTipo'
                                                        id='subTipo'
                                                        value={formData.subTipo}
                                                        required
                                                    >
                                                        <option value="">Seleccione el subtipo</option>
                                                        {tipo["subTipo"].map(subTipo => (
                                                            <option key={subTipo.id} value={subTipo.nombre}>{subTipo.nombre}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </div>
                                        )
                                    ))
                                )
                            ))
                          )
                      ))}
                      </>
                    )}
                    {selectedOption && (
                        <>
                        {categorias.map(categoria => (
                            selectedOption === categoria.nombre && categoria["pais"] && (
                                <div className='divs-form' key={categoria.id}>
                                    <label htmlFor="pais" className='divs-form'>
                                        <select
                                            className='input'
                                            type='text'
                                            onChange={handleInputChange}
                                            value={formData.pais}
                                            name='pais'
                                            id='pais'
                                            required
                                        >
                                            <option value="">Seleccione el pais</option>
                                            {categoria["pais"].map(pais => (
                                                <option key={pais.id} value={pais.nombre}>{pais.nombre}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )
                        ))}
                            <label htmlFor="Costo" className='divs-form'>
                                <input 
                                type='number'
                                className='input'
                                name='costo'
                                id='costo'
                                value={formData.costo}
                                onChange={handleInputChange}
                                placeholder='Inidicar costo'
                                />
                            </label>
                            <label htmlFor="observaciones" className='divs-form'>
                              <textarea 
                                type='text'
                                className='observaciones'
                                name='observaciones'
                                id='observaciones'
                                value={formData.observaciones}
                                onChange={handleInputChange}
                                placeholder='Descripción alternativa del gasto, detalles adicionales'
                                >
                              </textarea>
                            </label>
                            <Button
                            type='submit'
                            variant='contained' 
                            color='secondary'
                            size='large'
                            fullWidth={false}
                            endIcon={sending ? null : <SendIcon />}
                            disabled={sending}>
                            {sending ? 'Enviando...' : 'Enviar Registro'}
                            </Button>
                            {success && (
                            <div className='exito'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					                      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                              </svg>
                            </div>
                            )}
                        </>
                    )}
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default Form