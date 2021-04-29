package com.example.ebanking.repository;

import com.example.ebanking.entity.Send;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SendRepository extends JpaRepository<Send, Long> {
}
