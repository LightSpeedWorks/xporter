@node -p '\x1b[42m' & cls
@pushd %~dp0
@if "%XPORTER_PROXY_FOLDER%" == "" (
	set XPORTER_PROXY_FOLDER=work
	if not exist work mkdir work
)
@echo %XPORTER_PROXY_FOLDER%
@node net-fnet %XPORTER_PROXY_FOLDER% 33389 proxy 13389
@popd
@node -p '\x1b[41m'
@pause
