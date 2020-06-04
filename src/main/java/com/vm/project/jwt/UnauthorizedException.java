package com.vm.project.jwt;

public class UnauthorizedException extends RuntimeException{
	private static final long serialVersionUID = -2238030302650813813L;
	
	public UnauthorizedException() {
		super("로그인을 다시 시도하세요.");
	}
}
