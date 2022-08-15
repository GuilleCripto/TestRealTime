package com.guillermo.TestTecnico.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Date;

/**
 * User: José Guillermo Yánez
 * Date:2022-08-09
 * Time: 18:50
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    @NotBlank
    @Size(min = 0, max = 20)
    private String nombre;

    @Column(name = "tipo_producto")
    private String tipoProducto;

    @Column(name = "caracteristica")
    private String caracteristica;

    @Column(name = "capacidad")
    private String capacidad;

    @Column(name = "envace")
    private String envace;


    @Column(name = "hora")
    private ZonedDateTime hora;

    @Column(name = "nombre_cliente")
    private String nombreCliente;

    @Column(name = "estado")
    private String estado;

}
