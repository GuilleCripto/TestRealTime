package com.guillermo.TestTecnico.controller;

/**
 * User: José Guillermo Yánez
 * Date:2022-08-09
 * Time: 19:05
 */
import com.guillermo.TestTecnico.exception.ResourceNotFoundException;
import com.guillermo.TestTecnico.model.LoteDto;
import com.guillermo.TestTecnico.model.Product;
import com.guillermo.TestTecnico.model.ProductDTO;
import com.guillermo.TestTecnico.repository.ProductRepository;
import com.guillermo.TestTecnico.service.ProductService;
import com.guillermo.TestTecnico.util.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private static final Logger logger = LogManager.getLogger(ProductController.class);

    @Autowired
    private ProductRepository ProductRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    SimpMessagingTemplate template;

    @GetMapping
    @Operation(summary = "Get all product by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the product",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                    content = @Content) })
    public ResponseEntity<Message> getAllProducts(){
        logger.info("getAllProducts() ");
        List<Product> datos;
        try {
            datos = productService.findAll();
        } catch (DataAccessException e) {
            logger.error("getAllProducts(): Error querying database:");
            return new ResponseEntity<>(new Message(true, "Error querying database: " + e.getMessage() + " --- Caused by:: " + e.getMostSpecificCause().getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            logger.error("getAllProducts(): Unknown Error:  {} ", e.getMessage());
            return new ResponseEntity<>(new Message(true, "Unknown Error: " + e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(datos == null || datos.size() == 0) {
            logger.debug("getAllProducts(): Empty list");
            return new ResponseEntity<Message>(new Message(true,"Empty list",null), HttpStatus.NOT_FOUND);
        }
        logger.info("getAllProducts() the query is ready");
        return new ResponseEntity<>(new Message(false, "", datos), HttpStatus.OK);
    }

    // build create Product REST API
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        logger.info("createProduct() the name is {} ", product.getNombre() );
        Product productCreate = productService.save(product);
        List<Product> lista = productService.findAll();
        template.convertAndSend("/topic/message", lista);
        return productCreate;
    }


    // build get Product by id REST API
    @Operation(summary = "Get a product by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the product",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Product.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid id supplied",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Product not found",
                    content = @Content) })
    @GetMapping("{id}")
    public ResponseEntity<Message>  getProductById(@PathVariable  long id){
        try {
            Optional<Product> product = productService.findById(id);
            if (product.equals(Optional.empty() )){
                return new ResponseEntity<>(new Message(true, "Empty Product", null), HttpStatus.NOT_FOUND);
            }
            else{
                return new ResponseEntity(product, null, HttpStatus.OK);
            }

        }
        catch  (Exception e) {
            return new ResponseEntity<Message>(new Message(true,"Empty list",null), HttpStatus.NOT_FOUND);
        }

    }

    // build update Product REST API
    @PutMapping("{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id,@RequestBody Product ProductDetails) {
        Product updateProduct = productService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id: " + id));

       /* updateProduct.setFirstName(ProductDetails.getFirstName());
        updateProduct.setLastName(ProductDetails.getLastName());
        updateProduct.setEmailId(ProductDetails.getEmailId());*/

        productService.save(updateProduct);

        return ResponseEntity.ok(updateProduct);
    }

    // build delete Product REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable long id){

        Product product = ProductRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id: " + id));
        productService.delete(product);

        sendToClient();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
    private void sendToClient() {
        List<Product> lista = ProductRepository.findAll();
        template.convertAndSend("/topic/message", lista);
    }

    @MessageMapping("/sendMessage")
    public void receiveMessage(@Payload ProductDTO productDTO) {
        // receive message from client
    }

    @SendTo("/topic/message")
    public List<ProductDTO> broadcastMessage(@Payload List<ProductDTO> productDTOS) {
        return productDTOS;
    }


    @PostMapping("/createLote")
    public String createProductLote(@RequestBody LoteDto loteDto) {
        logger.debug("createProductLote(): Quantity {} ", loteDto.getValueOfFind());
        Long maximoId = Long.valueOf(0);
        if(productService.max() != null) {
            maximoId = productService.max()+ 1;
        }

        int especie = 0;
        String[] especies =  new String[] {"bebida", "comida", "salsa", "especies"};
        for(int i = 0; i <= loteDto.getValueOfFind() - 1; i++)
        {
            long maximo = maximoId+ i;
            Product product1 = new Product();
            product1.setId(maximo);
            product1.setNombre("Producto Numero "+ maximo);
            product1.setTipoProducto(especies[especie]);
            product1.setCaracteristica(String.valueOf(Math.random() < 0.5));
            product1.setEnvace(product1.getCaracteristica() == "true"  ? "botella" : "cajas");
            product1.setCapacidad(product1.getCaracteristica() == "true"  ? "100" : "1000");
            product1.setEstado("CREATED");
            especie++;
            if (especie > 3 ) {
                especie = 0;
            }
            createProduct(product1);
        }

        return "ok";
    }


}
