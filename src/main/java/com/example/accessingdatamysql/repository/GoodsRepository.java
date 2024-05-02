package com.example.accessingdatamysql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.accessingdatamysql.Goods;
import java.util.List;


@Repository
public interface GoodsRepository extends JpaRepository<Goods, Integer> {
  Goods findByName(String name);
  List<Goods> findByOrderByHotDesc();
}
